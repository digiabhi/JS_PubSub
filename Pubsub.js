class Pubsub {
  constructor() {
    this.subscribers = {}; // {eventName: [cb_subs1, cv_subs2, cb_subs3, ...]}
  }

  /**
   *
   * @param event -> String denoting unique event fired
   * @param callback -> For a subscriber what method should be executed when an event is fired
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      // Currently no subscriber callback was registered for the event
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }

  /**
   *
   * @param event -> String denoting unique event fired
   * @param data -> For the given event what data should be passed along with publishing the event
   */
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => callback(data));
  }
}

const pb = new Pubsub();

const unsubUser1 = pb.subscribe("event1", function user1(data) {
  console.log("User 1 event 1", data);
});
const unsubUser2 = pb.subscribe("event1", function user2(data) {
  console.log("User 2 event 1", data);
});
const unsubNewUser1 = pb.subscribe("event2", function user1(data) {
  console.log("User 1 event 2", data);
});
pb.publish("event1", { value: "This is first event" });
pb.publish("event2", { value: "This is second event" });
// console.log(pb.subscribers);
unsubUser1();
// console.log(pb.subscribers);
pb.publish("event1", { value: "this is first event" });
