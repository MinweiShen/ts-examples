type PropEventSource<Type> = {
  on<Key extends string & keyof Type>
      (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

// type check!!!
person.on('firstNameChanged', (v: string) => {});
person.on('firstChanged', (v: string) => {});

export{}