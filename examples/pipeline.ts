
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

interface IPipeline {
  process(input: UnderConstruction): DataProcessed;
  pipe(p: IPipeline): IPipeline;
}

abstract class Pipeline implements IPipeline {
  abstract process(input: UnderConstruction): DataProcessed;

  pipe(p: IPipeline): IPipeline {
    return new PipelineMerger(this, p);
  }
}

class PipelineMerger implements IPipeline{
  constructor(private p1: IPipeline, private p2: IPipeline) {}
  process(input: UnderConstruction): DataProcessed {
    const v1 = this.p1.process(input);
    if (isDone(v1)) return v1;
    return this.p2.process(v1 as UnderConstruction);
  }

  pipe(p: IPipeline): IPipeline {
    return new PipelineMerger(this, p);
  }
}

class RemoveOddNumberPipeline extends Pipeline {
  process(input: UnderConstruction): UnderConstruction {
    return {
      data: input.data.filter(d => d % 2 === 0)
    }
  }
}

class DoubleTheNumberPipeline extends Pipeline {
  process(input: UnderConstruction): UnderConstruction {
    return {
      data: input.data.map(d => d * 2)
    };
  }
}

class ConvertToStringPipeline extends Pipeline {
  process(input: UnderConstruction): Done {
    return {
      result: input.data.map(d => d.toString())
    };
  }
}

const pipelines = [new RemoveOddNumberPipeline(), new DoubleTheNumberPipeline(), new ConvertToStringPipeline()] as IPipeline[];
const thePipeline = pipelines.reduce((prev, curr) => prev.pipe(curr));
const data = [1,2,3,4];
console.log((thePipeline.process({data}) as Done).result);
export {}