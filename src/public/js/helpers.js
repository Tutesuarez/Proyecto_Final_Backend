const addToCart = async (e) => {
  if (e.target.classList.contains("addtocart")) {
    let pid = e.target.dataset.id;
    const cid = document.querySelector('.cart-id')
    console.log(cid);
    let res = await fetch(
      `api/carts/${cid.textContent}/products/${pid}`,
      { method: "POST" }
    );
    let message = await res.json();
    if (message?.success) {
      Swal.fire({
        text: `${message.success}`,
        toast: true,
        position: "top-right",
      });
    } else {
      Swal.fire({
        text: `${message.error}`,
        toast: true,
        position: "top-right",
      });
    }
  }
};

const deleteProduct = async (e) => {
  if (e.target.classList.contains("deleteProduct")) {
    let pid = e.target.dataset.id;
    let res = await fetch(`api/products/${pid}`, { method: "DELETE"})
    let message = await res.json();
    if (message?.success) {
      Swal.fire({
        text: `${message.success}`,
        toast: true,
        position: "top-right",
      });
      
    } else {
      Swal.fire({
        text: `${message.error}`,
        toast: true,
        position: "top-right",
      });
    }
    setTimeout(() => window.location.href = `/products`, 300)
  }
};