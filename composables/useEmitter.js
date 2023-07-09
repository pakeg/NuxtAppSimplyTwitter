import mitt from "mitt";

const emitter = mitt();

export default useEmitter = () => {
  return {
    $on: emitter.on,
    $emit: emitter.emit,
  };
};
