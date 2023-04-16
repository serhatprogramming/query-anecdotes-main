import { useQuery, useQueryClient, useMutation } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useNotificationDispatch } from "./NotificationContext";

import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "ADD",
      payload: `("${anecdote.content}") is voted`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAN" });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes);

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
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
