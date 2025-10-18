export function Card({imgUrl, profile}) {
  return (
  <div 
    className="card-details" 
    style={{textAlign: "center"}}
  >
    <Avatar 
      imgUrl={imgUrl} />
    <Info 
      profile={profile}
    />
    <Button /> 
    <hr />
  </div>
  )
}

function Button() {
  return (
    <button>Contact</button>
   )
}

function Info({profile}) {
  return (
    <p>{profile}</p>
  )
}

function Avatar({ imgUrl }) {
  return (
    <img 
      src={ imgUrl }
      alt="avatar"
      style= {{ width: "200px" }}
      />
  )
}
