//console.log("test");

const buttons = document.querySelectorAll(".addToCart");
//console.log(buttons);

const addToCartClient = async (id) => {
  try {
    await fetch("/", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

buttons.forEach((button) => {
  //   console.log(button);
  button.addEventListener("click", () => {
    const id = button.dataset.id;
    addToCartClient(id);
    location.reload();
  });
});

// fetch(URL, {
//   method: "POST", // or PUT or DELETE
//   body: JSON.stringify({
//     key1: "value1", // replace with key/value based on documentation
//     key2: "value2", // same as above (if needed)
//   }),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data); // read server response
//   })
//   .catch((error) => {
//     console.error(error);
//   });
