type GreetingProps = {
  name: string;
  age?: number;
}

export function Greetings({ name, age }: GreetingProps) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      {age !== undefined && <p>You are {age} year old</p>}
    </div>
  )
}