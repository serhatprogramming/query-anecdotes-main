import { useQuery } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { getAnecdotes } from "./requests";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery("anecdotes", getAnecdotes);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>An error occurred {result.error.message}</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
