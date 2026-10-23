export const lifecycle = [
  { name: "New", text: "A bug or a requirement lands. I reproduce it, write the steps down and decide what “fixed” looks like." },
  { name: "Assigned", text: "One owner, one priority, one definition of done. Nothing sits in a shared inbox." },
  { name: "In progress", text: "I fix the cause, not the symptom, and add a test that fails without the fix." },
  { name: "Fixed", text: "Reviewed, merged, and the test that failed now passes in CI." },
  { name: "Verified", text: "A second pass on a clean build: the original steps, plus the neighbours it could have broken." },
  { name: "Closed", text: "Shipped with proof attached: the test run, the notes, the link. “Works on my machine” never closes a ticket." },
];
