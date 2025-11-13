interface UserCardProps {
  name: string;
  age?: number;
  isOnline: boolean;
}

export function UserCard({name, age, isOnline} : UserCardProps) {
  return (
    <div>
      <p>{name} is {age} year old is {isOnline ? "Online" : "Offline"}</p> 
    </div>
  )
} 
