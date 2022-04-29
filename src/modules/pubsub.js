const Event = function () {
  const _handlers = [];

  const addHandler = (handler) => {
    _handlers.push(handler);
  };
  const removeHandler = (handler) => {
    const idx = _handlers.findIndex((e) => e === handler);
    _handlers.splice(idx, 1);
  };
  const fire = (eventArgs) => {
    _handlers.forEach(function (h) {
      h(eventArgs);
    });
  };

  return { addHandler, removeHandler, fire, _handlers };
};

const eventAggregator = (function () {
  const events = {};

  return {
    publish(eventName, eventArgs) {
      if (!events[eventName]) events[eventName] = Event();
      events[eventName].fire(eventArgs);
      console.log(events);
    },

    subscribe(eventName, handler) {
      if (!events[eventName]) events[eventName] = Event();
      events[eventName].addHandler(handler);
    },
  };
})();

export { eventAggregator as pubSub };
