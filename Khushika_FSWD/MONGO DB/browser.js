fetch("http://localhost:5000/addUser", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Shojal",
        email: "shojalhalbe2513@gmail.com"
    })
});

