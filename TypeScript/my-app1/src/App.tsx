type StatusProps = {
  status: "loading" | "success" | "error";
};

function StatusMessage({ status }: StatusProps) {
  if (status === "loading") return <p>Loading...</p>;
  if (status === "success") return <p>Success!</p>;
  return <p>Error occured</p>
}

  export default function App2(){
  return (
    <>
      <StatusMessage status={"loading"}/>
    </>
  )
}