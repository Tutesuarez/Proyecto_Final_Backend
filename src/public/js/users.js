let users = document.getElementById("users")
let delete_action = document.getElementById("delete-innactive")

// event button to change roles
users.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-outline-primary")) {
    let id = e.target.dataset.id;
    let response = await fetch(`api/users/premium/${id}`)
    let result = await response.json()
    if (result.status === "success") {
      alert(result.payload.message);
      setTimeout(() => window.location.href = `/users`, 500)
    } else {
      alert(result.payload);
    }
  }
})

// Event button delete user
users.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-outline-danger")) {
    console.log('click');
    let id = e.target.dataset.id;
    let response = await fetch(`api/users/user/${id}`, { method: "DELETE" })
    let result = await response.json()
    if (result.status === "success") {
      alert(result.payload.message)
      setTimeout(() => window.location.href = `/users`, 500)
    } else {
      alert(result.payload);
    }
  }
})


// Event button delete al user with innactivity
delete_action.addEventListener("click", async () => {
  let response = await fetch(`/api/users/`, { method: "DELETE" })
  let result = await response.json()
  if (result.status === "success") {
    alert(result.payload)
    setTimeout(() => window.location.href = `/users`, 500)
  } else {
    alert(result.payload)
  }
})
