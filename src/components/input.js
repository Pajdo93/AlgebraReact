import React, { useState } from "react";

const Input = () => {
  const [input, setInput] = useState("");
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState();
  //krivo sam nazvao prvo repos, umjesto useri na Gitu, onda nisam imao vremena ispravljati

  const fetchData = () => {
    fetch(`https://api.github.com/users/${input}`)
      .then((resp) => resp.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error(error.message));

    fetch(`https://api.github.com/users/${input}/repos`)
      .then((resp) => resp.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error.message));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Unesite username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={fetchData}>Traži podatke</button>
      {repos && user && (
        <>
          <p>
            avatar url: <img src={repos.avatar_url} />{" "}
          </p>
          <p>name: {repos.name} </p>
          <p>location: {repos.location}</p>
          <p>bio: {repos.bio}</p>
          <ol>
            {user.map((item) => (
              <li key={item.id}> {item.name}</li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Input;
