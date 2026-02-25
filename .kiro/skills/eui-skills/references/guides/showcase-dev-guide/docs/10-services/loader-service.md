# EuiLoaderService

## Overview
`EuiLoaderService` is an Angular service for dynamically loading external dependencies (JavaScript or CSS) into the DOM and managing their statuses. It supports loading dependencies with prerequisites, retry and timeout policies for failed loads, and emits status changes of dependencies.

## Usage

### Adding a Dependency
To add a dependency, use the `addDependency` method. Specify the name, URL, and type (`js` or `css`). Optionally, list prerequisites.

```typescript
loader.addDependency('Quill', 'https://cdn.quilljs.com/1.3.6/quill.js', 'js');
```

### Listening for Status Changes
To listen for status changes of a dependency, use the `statusChanges` method.

```typescript
loader.statusChanges('Quill').subscribe((status: Status) => {
  console.log(status);
});
```

### Removing a Dependency
To remove a dependency, use the `removeDependency` method.

```typescript
loader.removeDependency('Quill');
```

### Configuring Retry and Timeout Policies
Set retry and timeout policies using `setRetryPolicy` and `setTimeoutPolicy`.

```typescript
loader.setRetryPolicy(3, 1000);
loader.setTimeoutPolicy(5000);
```

### Loading Dependencies with Prerequisites
Load a dependency with prerequisites by listing them in the `addDependency` call.

```typescript
loader.addDependency('Quill', 'https://cdn.quilljs.com/1.3.6/quill.js', 'js', ['QuillStyle']);
loader.addDependency('QuillStyle', 'https://cdn.quilljs.com/1.3.6/quill.snow.css', 'css');
```

## Methods

### addDependency(name: string, url: string, type: 'js' | 'css', requires?: string[]): void
Adds a new dependency. If it's not already present, it loads it into the DOM.

### removeDependency(name: string): void
Removes a specified dependency from the DOM and the internal list.

### setRetryPolicy(maxAttempts: number, retryInterval: number): void
Configures the retry policy for loading dependencies.

### setTimeoutPolicy(time: number): void
Sets the timeout duration before considering a load attempt as failed.

### statusChanges(name: string): Observable<Status>
Returns an Observable that emits the status of the specified dependency.

### getDependencyStatus(name: string): Status | null
Gets the current status of a specified dependency. Deprecated in favor of `statusChanges`.

## Model
The service relies on the `Dependency`, `Policy`, and `Status` models export from `@eui/core`.

## Notes
- Dependencies can have prerequisites that will be loaded first.
- Failed loads are retried according to the retry policy.
- The service emits status changes for each dependency.
