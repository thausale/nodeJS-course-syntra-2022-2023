const form = document.querySelector("form");

form.onsubmit = async (e) => {
  e.preventDefault();
  try {
    const title = form.title.value;
    const email = form.email.value;
    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, email, completed: false }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data);
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
};
