console.log("hello from worker");

const handleMessage = () => {};

const main = () => {
  onmessage = handleMessage;
};

main();
