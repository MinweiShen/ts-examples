interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

// this is a conditional type
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;


  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }
  
  let ca = createLabel("typescript");
       
  let cb = createLabel(2.8);
    
  let cc = createLabel(Math.random() ? "hello" : 42);

  export {};