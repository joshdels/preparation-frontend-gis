import Item from './Item'

const users = [
  {name: 'Joshua', location: 'De Leon', isUsed: true},
  {name: 'Apple', location: 'Tagum', isUsed: false},
  {name: 'Peach', location: 'Australia', isUsed: true}
]

export default function Box() {
  return (
    <div>
      <span>This is a box</span>

      <ul>
        {users.map(user => (
          <Item 
            name = {user.name}
            location = {user.location}
            isUsed = {user.isUsed}
          />
        ))}

      </ul>
    </div>
  );
}