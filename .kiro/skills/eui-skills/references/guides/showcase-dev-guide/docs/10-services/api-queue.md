# ApiQueueService Documentation

## Overview
`ApiQueueService` is a TypeScript service designed for managing and processing a queue of API requests in web applications. This service facilitates controlled execution of HTTP requests, allowing for orderly processing, error handling, and management of multiple requests. It includes methods for adding, processing, and removing requests from the queue, with options for sequential or bulk processing.

## Key Features
- **Queue Management**: Add or remove items from the API request queue.
- **Sequential Processing**: Process items in the queue in a specific order based on timestamps.
- **Bulk Processing**: Handle all items in the queue at once, with an option to continue on error.
- **Error Handling**: Log errors and manage request failures gracefully.

## Real-life Use Cases
- **Web Applications with High Data Fetching Requirements**: Efficiently manage multiple API calls required for data-intensive applications.
- **Batch Processing Tasks**: Handle a series of API requests in a batch, processing them sequentially or in bulk.
- **Complex User Interactions**: Manage dependent API calls that need to be executed in a specific order based on user actions.
- **Handling Application or Network Failures**: In scenarios where form submission fails due to a crash or network issues, the ApiQueueService can queue the API call for later processing, improving the user experience by not requiring the user to resubmit the form manually.
- **Enhancing Offline Application Experience**: For mobile applications or situations with intermittent network access, ApiQueueService can store API calls and process them once connectivity is restored, providing a seamless offline user experience.

## Getting Started
Service Integration
To integrate ApiQueueService into your Angular application:

1. Inject `ApiQueueService` into components or services where required. You can also extend it with your own implementation.
2. Ensure `CoreModule.forRoot()` or `CoreModule.forChild()` is imported in your module to provide the service, as it is part of the `@eui/core` package.

Keep in mind that this service is stateless.

```typescript
import { ApiQueueService } from '@eui/core';

@Component({...})
export class YourComponent {
    constructor(private apiQueue: ApiQueueService) { }
}
```

## API
### `ApiQueueItem` Interface

Each queue item is represented by an `ApiQueueItem` interface, which includes the following properties:

- `uri`: The endpoint URL.
- `method`: HTTP method (`GET`, `POST`, `PUT`).
- `payload`: Optional data to send with the request.
- `timestamp`: Optional timestamp indicating when the item was queued.

### Adding Items to the Queue

Use `addQueueItem(itemId: string, item: ApiQueueItem)` to add a new request to the queue. A unique `itemId` and an `ApiQueueItem` object are required. The `timestamp` is set automatically upon dispatch.

#### Adding an Item to the Queue
```typescript
apiQueueService.addQueueItem({ id: 'item124', method: 'POST', uri: '/api/data', payload: {...} });
```

### Removing Items from the Queue

To remove an item, call `removeQueueItem(itemId: string)`. To clear the entire queue, use `removeAllQueueItem()`.

#### Removing an Item from the Queue
```typescript
apiQueueService.removeQueueItem('item123');
```

### Processing Queue Items

#### Processing a Single Item
`processQueueItem(itemId: string)` Processes a single item, returning an `Observable` of the HTTP response.
```typescript
apiQueueService.processQueueItem('item123').subscribe(result => {
console.log('Processed item 123 with result:', result);
});
```

#### Processing All Items Sequentially
`processAllQueueItemsSequential(ascending: boolean = true)` Processes all items sequentially, allowing for ordered execution based on `timestamp`.
```typescript
apiQueueService.processAllQueueItemsSequential(false).subscribe(results => {
console.log('Processed all items in descending order:', results);
});
```

#### Processing All Items with Error Continuation
`processAllQueueItems(continueOnError: boolean = true)` Processes all items in parallel, returning an `Observable` array of responses.
```typescript
apiQueueService.processAllQueueItems(true).subscribe(results => {
console.log('Processed all items, continuing on errors:', results);
});
```

## Error Handling

Errors are managed through RxJS's `catchError` operator within observables. If `processAllQueueItems(false)` is called and an item fails, an error will be thrown, though other items may complete.

## State Management

The service uses StoreService to manage the queue's state. The lifecycle of an `ApiQueueItem` in the state is detailed, with explanations on state changes.

<em>**Beware**</em>
> In case you call processAllQueueItems(false), and one item in the Queue fails, you will get an error. That doesn't necessarily mean though that some requests were not completed and removed from the Queue. Also, all items in the Queue are executed in parallel, which means that order is not guaranteed.
> 
> If you want order, then use processAllQueueItemsSequential().

## Mocking for Testing
For unit testing components or services that inject `ApiQueueService`, a mock class `ApiQueueServiceMock` is available for import and use.

## Conclusion
`ApiQueueService` is a versatile tool for managing API requests within an application, ensuring efficient and orderly processing of multiple requests. Its ability to handle requests in both sequential and bulk manners, coupled with robust error handling, makes it a valuable asset in complex web application development.

## Code Snippets and Examples

#### Advanced Use Case: Batch Processing with Custom Error Handling

You may encounter scenarios where you need to process a batch of API queue items and require custom error handling for each item, without stopping the entire batch processing if one fails.

```typescript
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define a custom error handling function
function handleItemError(error, itemId) {
  console.error(`Error processing item ${itemId}:`, error);
  // Continue with the next item by returning an EMPTY observable
  return EMPTY;
}

// Process each item and apply custom error handling
this.apiQueue.getAllQueueItems().pipe(
  concatMap((item) => 
    this.apiQueue.processQueueItem(item.id).pipe(
      catchError((error) => handleItemError(error, item.id))
    )
  )
).subscribe({
  next: (response) => {
    console.log('Item processed:', response);
  },
  complete: () => {
    console.log('All items processed, with individual error handling.');
  }
});
```

#### Retry Strategy with Delay

In some use cases, you might want to retry a failed request after a certain delay. This can be useful if the error might be due to temporary issues such as network flakiness.

```typescript
import { retryWhen, delay, tap } from 'rxjs/operators';

this.apiQueue.processQueueItem('itemId')
  .pipe(
    retryWhen(errors => 
      errors.pipe(
        // Log the error
        tap(error => console.log('Will retry after a delay', error)),
        // Wait for 5000ms before retrying
        delay(5000)
      )
    )
  )
  .subscribe({
    next: (response) => {
      console.log('Data after retrying:', response);
    },
    error: (error) => {
      console.error('Error after retrying with delay:', error);
    }
  });
```

#### Processing with Progress Update

If you want to provide progress updates to the user as items are being processed, you could use the `tap` operator to perform side effects without altering the data stream.

```typescript
import { tap } from 'rxjs/operators';

this.apiQueue.getAllQueueItems().pipe(
  tap(() => console.log('Starting to process items')),
  concatMap((item, index, array) => 
    this.apiQueue.processQueueItem(item.id).pipe(
      tap(() => console.log(`Processed item ${index + 1} of ${array.length}`))
    )
  )
).subscribe({
  complete: () => {
    console.log('Processed all items with progress updates.');
  }
});
```
