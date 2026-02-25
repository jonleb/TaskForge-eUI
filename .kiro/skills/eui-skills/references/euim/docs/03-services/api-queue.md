# ApiQueue Service
## Overview
The ApiQueue is a service to create, and Queue POST PUT and GET API calls. It exposes an easy to use API for adding removing and processing **ApiQueueItem**. Under the hood, it exploits the NgRx to save the items in the application state. This service is useful since you can keep the unprocessed API calls in the application state by using the StorageService and continue with them later.

### Getting Started
To use the ApiQueueService, simply Inject it your Component or Service or you can extend it and Provide your implementation. This service is part of **CoreModule** located at **@eui/core** package, so make sure that you have imported in your module the **CoreModule.forRoot or forChild** to inject an instance of that service. Keep in mind that this service is stateless.

```javascript
@Component({...})
export class TestComponent {
	constructor(private apiQueue: ApiQueueService) { }
}
```

## API
### ApiQueueItem Model
The interface of the ApiQueueModel is
```javascript
export interface ApiQueueItem {
    uri: string;
    method: string;
    payload?: any;
    timestamp?: number;
}
```
### Add Item
Adds an item in the API queue. Please provide a unique item ID and the object itself, which is of type **ApiQueueItem**. All you need to pass here is URL, **method** (_accepts only GET, PUT, POST_), payload, and timestamp are optional. This dispatches an NgRx action and adds the QueueItem to the application state. Beware that the timestamp is being set during the Dispatch.

```javascript
addQueueItem(itemId: string, item: ApiQueueItem)
```

### Remove Item

Help you remove an item from the Queue by dispatching an action to NgRx and alter the application state. You can also clear the Queue.
```javascript
removeQueueItem(itemId: string): void
removeAllQueueItem(): void
```
### Process Item

Return an observable which calls NgRx selector to retrieve the QueueItem, returns the Http object, which is built with HttpClient's help based on QueueItem metadata and after successful completion, it removes the item from the Queue. You can also process all items in the Queue, this actually constructs an Observable for each item and then executes them in a formJoin. Eventually, when all items have processed, you will get an array that contains all responses. Last but not least, you can process all items in the Queue in sequence instead of parallel. You can also provide the order which they execute based on their timestamp.
```javascript
processQueueItem(itemId: string): Observable<any>
processAllQueueItems(continueOnError: boolean = true): Observable<any[]>
processAllQueueItemsSequential(ascending: boolean = true): Observable<any[]>
```
<em>**Beware**</em>
> In case you call processAllQueueItems(false), and one item in the Queue fails, you will get an error. That doesn't necessarily mean though that some requests were not completed and removed from the Queue. Also, all items in the Queue are executed in parallel, which means that order is not guaranteed.
> 
> If you want order, then use processAllQueueItemsSequential().

## Mock
In case you want to perform Unit Tests of your Component or Service that Injects the API Queue service, you can import the ApiQueueServiceMock class.

## Use Cases

### Application or Network Failure
Let's say that our user wants to submit or save a form, and by the time of submission, browser crashes, or network fails. Let's assume that this form was long and took some time for the user to fill it. Also, let's assume that we may or may not have a Draft save feature. In case we have the Draft feature, let's assume that this feature keeps the form into the server and not in the client. Now in every single case, the form posting fails to happen. This will cost our user a lot of time to resubmit. In such a case, during form submission, we add the Call to the Queue, and then we process the Call by using the ApiQueueItem API. In case of failure, we can handle the unprocessed item of the Queue when network access is regained or when the application is being loaded (let's say that browser tab closed). This leverages the user experience by having the user not worried about unposted form submissions.

### Offline Application Experience
Similar to the previous scenario, the offline application experience can be provided. It might be convenient for a mobile application using Ionic and eUI. Let's say that the network is down for some reason. Maybe use is driving through a tunnel or located in a basement were no network access for a mobile device or network access is simply fails. That user could have been in the middle of submitting a form or performing an action. We don't want the user's interaction with the application to be interrupted. In such a case, ApiQueueService can leverage user experience to and offline one.
