
/* An example of defining some pipelines in ts*/
interface DataProcessed {}

type Result = string[];
type Input = number[];
interface Done extends DataProcessed {
  result: Result;
}

interface UnderConstruction extends DataProcessed {
  data: Input;
}

function isDone(data: DataProcessed): data is Done {
  return (data as Done).result !== undefined;
} 

function isUnderConstruction(data: DataProcessed): data is UnderConstruction {
  return (data as UnderConstruction).data !== undefined;
} 

interface IPipeline<Out> {
  process(input: UnderConstruction): Out;
  pipe(p: IPipeline<DataProcessed>): IPipeline<DataProcessed>;
}

abstract class Pipeline<Out> implements IPipeline<Out> {
  abstract process(input: UnderConstruction): Out;

  pipe(p: IPipeline<DataProcessed>): IPipeline<DataProcessed> {
    return new PipelineMerger(this, p);
  }
}

class PipelineMerger implements IPipeline<DataProcessed>{
  constructor(private p1: IPipeline<DataProcessed>, private p2: IPipeline<DataProcessed>) {}
  process(input: UnderConstruction): DataProcessed {
    const v1 = this.p1.process(input);
    if (isDone(v1)) return v1;
    return this.p2.process(v1 as UnderConstruction);
  }

  pipe(p: IPipeline<DataProcessed>): IPipeline<DataProcessed> {
    return new PipelineMerger(this, p);
  }
}

class RemoveOddNumberPipeline extends Pipeline<UnderConstruction> {
  process(input: UnderConstruction) {
    return {
      data: input.data.filter(d => d % 2 === 0)
    }
  }
}

class DoubleTheNumberPipeline extends Pipeline<UnderConstruction> {
  process(input: UnderConstruction) {
    return {
      data: input.data.map(d => d * 2)
    };
  }
}

class MightEndEarlierPipeline extends Pipeline<DataProcessed> {
  process(input: UnderConstruction) {
    return {
      result: input.data.map(_ => "This ends earlier")
    };
  }
}

class ConvertToStringPipeline extends Pipeline<Done> {
  process(input: UnderConstruction) {
    return {
      result: input.data.map(d => d.toString())
    };
  }
}

const data = [1,2,3,4];

const pipelines1 = [new RemoveOddNumberPipeline(), new DoubleTheNumberPipeline(), new ConvertToStringPipeline()] as IPipeline<DataProcessed>[];
const pipeline1 = pipelines1.reduce((prev, curr) => prev.pipe(curr));
console.log((pipeline1.process({data}) as Done).result);

const pipelines2 = [new RemoveOddNumberPipeline(), new MightEndEarlierPipeline(), new DoubleTheNumberPipeline(), new ConvertToStringPipeline()] as IPipeline<DataProcessed>[];
const pipeline2 = pipelines2.reduce((prev, curr) => prev.pipe(curr));
console.log((pipeline2.process({data}) as Done).result);


export {}