// delete each product from the cart
const deleteProduct = async (e) => {
  if (e.target.classList.contains("btn-danger")) {
    const cid = document.querySelector('.cart-id').textContent;
    let pid = e.target.dataset.id;
    let res = await fetch(`/api/carts/${cid}/products/${pid}`, { method: "DELETE" });
    let message = await res.json();
    if (message?.success) {
      Swal.fire({
        text: `${message.success}`,
        toast: true,
        position: "top-right",
      });
      setTimeout(() => window.location.href = `/carts`, 500)
    } else {
      Swal.fire({
        text: `${message.error}`,
        toast: true,
        position: "top-right",
      });
    }
  }
};

let deleteButtons = document.querySelectorAll(".btn-delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", deleteProduct);
});



