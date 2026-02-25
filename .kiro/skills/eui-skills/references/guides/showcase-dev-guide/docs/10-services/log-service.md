# Log Service

## Overview
The `CoreModule` provides a `LogService` for logging different type of messages. The service has been developed in accordance with the best practices and terminology imposed by different logging services, like [Log4j](https://logging.apache.org/log4j), [log4javascript](http://log4javascript.org/), [typescript-logging](https://www.npmjs.com/package/typescript-logging), [ionic-logging-service](https://www.npmjs.com/package/ionic-logging-service), etc.

The log service is supporting the following log levels:

| Message       | description |
| ------------- |:-------------:|
| **OFF**       | The highest possible rank and is intended to turn off logging.                          |
| **FATAL**     | Designates very severe error events that will presumably lead the application to abort. |
| **ERROR**     | Designates error events that might still allow the application to continue running.     |
| **WARN**      | Designates potentially harmful situations. |
| **INFO**      | Designates informational messages that highlight the progress of the application at coarse-grained level. |
| **DEBUG**     | Designates fine-grained informational events that are most useful to debug an application. |
| **TRACE**     | Designates finer-grained informational events than the DEBUG. |
| **ALL**       | All levels. |

A log request of level **p** in a logger with level **q** is **enabled** if p >= q. The order of the levels is this ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < OFF.

The `LogService` is capable to work with multiple appenders. A log appender is responsible for sending the log messages to some destination or medium. The default and most used appender is the `ConsoleAppender`, responsible to write messages in the browser console. Other appenders can be created and added to the `LogService`. An example might be a service/url/server appender, responsible to log the messages on the server.

# Usage

Simply inject the `LogService` in your component/service and use one of the following methods:

*   `fatal(message: any, ...additionalMessages: any[])`
*   `error(message: any, ...additionalMessages: any[])`
*   `warn(message: any, ...additionalMessages: any[])`
*   `info(message: any, ...additionalMessages: any[])`
*   `debug(message: any, ...additionalMessages: any[])`
*   `trace(message: any, ...additionalMessages: any[])`  


```javascript
import { Component } from '@angular/core';
import { LogService } from '@eui/core';

@component({
    ...
})
export class MyComponent {
    constructor(private log: LogService, private myService: MyService) { }
    
    doSomething(): void {
        this.myService.loadStuff()
            .subscribe((data) => {
                try {
                    this.log.info('items loaded', data);
                } catch(e) {
                    this.log.error(e.toString());
                }
            });
    }
}
```
Usually, it is enough to log messages in this way. We recommend, though, to create a `Logger` from the `LogService` and to use that `Logger` instead. For example:

```javascript
import { Component } from '@angular/core';
import { LogService, Logger } from '@eui/core';

@component({
    ...
})
export class MyComponent {

    private logger: Logger;
    constructor(logService: LogService, private myService: MyService) {
        this.logger = logService.getLogger(`'MyApp.MyComponent'`);
    }

    doSomething(): void {
        this.myService.loadStuff()
            .subscribe((data) => {
                try {
                    this.logger.info('items loaded', data);
                } catch(e) {
                    this.logger.error(e.toString());
                }
            });
    }
}
```
The log messages defined with a logger will be easier to read and trace, because of the category or logger name, which should be unique for every component/service.

In the previous example, for each instance of `MyComponent`, a new `Logger` instance will be created. If, instead, you prefer to **cache** the loggers (making them persistent), you can create the loggers in this way:
```javascript
this.logger = logService.getLogger('MyApp.MyComponent', true);
```

Apart from the static configuration of the `LogService` (presented in the next chapter), `LogService` and `Logger` are exposing their `LogLevel` through the getter `getLevel` and the setter `setLevel`. These two methods can be used programmatically to show or change the logging level. For example:
```javascript
import { Component } from '@angular/core';
import { LogService, Logger, LogLevel } from '@eui/core';

@component({
    ...
})
export class MyComponent {
    
    private logger: Logger;
    constructor(logService: LogService, private myService: MyService) {
        this.logger = logService.getLogger(`'MyApp.MyComponent'`);
        this.logger.setLevel(LogLevel.DEBUG);
    }

    setLogLevel(logLevel: LogLevel): void {
        this.logService.setLevel(logLevel);
    }
}
```
## Configuration

By default, the `LogService` is configured to with the log level **ERROR**. To change the `logLevel` you need to pass it to your [application configuration](https://eui.ecdevops.eu/eui-showcase-ux-components-19.x/showcase-dev-guide/docs/10-advanced-concepts/03-app-config), in the `config/index.ts` file:
```javascript
import { LogLevel } from '@eui/core';
export const appConfig: EuiAppConfig = {
    ...
    log: {
        logLevel: LogLevel.INFO,
    },
    ...
};
```
You can now override this setting by environment, in order to have a different log level when the application is deployed.

If you want to define other appenders or appenders with a different configuration, you can use the `logAppenders` parameter. For example:
```javascript
import { LogLevel, ConsoleAppender } from '@eui/core';

export const appConfig: EuiAppConfig = {
    ...
    log: {
        logLevel: LogLevel.ERROR,
        logAppenders: [{
            type: ConsoleAppender,
            prefixFormat: '[{level}]',
        }],
    },
    ...
};
```    

This example is also the default configuration of `LogService`. The `ConsoleAppender` is accepting a parameter called `prefixFormat`, responsible to add additional information, apart from the message itself. In our case, the value `{level}` will be replaced with the actual message level. For example, if the message is an error, the message will be prefixed by `[ERROR]`. The `ConsoleAppender` is supporting the following standard placeholders:

**{level}**

The level of the log message

**{logger}**

The name of the logger responsible for logging

**{date}**

The date, using the method [Date.prototype.toLocaleDateString](https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp)

**{time}**

The date, using the method [Date.prototype.toLocaleTimeString](https://www.w3schools.com/jsref/jsref_tolocaletimestring.asp)

Custom placeholders can be declared, as well. For example, if you want to see the log level in lowercase:
```javascript
export function LogConsoleLowercasePrefixConverter(event: LogEvent): string {  
    return event.levelName.toLowerCase();
};
...
export const appConfig: EuiAppConfig = {
    ...
    log: {
        logAppenders: [{
            type: ConsoleAppender,
            prefixFormat: '[{lowercaseLevel}] [{logger}]',
            prefixConverters: {
                '{lowercaseLevel}': LogConsoleLowercasePrefixConverter,
            },
        }],
    },
    ...
};
```

In your lazy loaded modules, you can have a `LogService` with different configuration than the global one. In the `config/modules.ts` file, you can use the same parameters as in the global configuration:
```javascript
export const MODULES = {
      ...
      portfolio: {
        ...
        logLevel: LogLevel.TRACE,
        ...
      },
      ...
};
```
You still need to link the module with its own configuration. This can be done using the following code:
```javascript
import { NgModule } from '@angular/core';
import { CoreModule } from '@eui/core';
...
@NgModule({
    ...
    imports: [
        ...
        CoreModule.forChild('portfolio'),
        ...
    ],
    ...
})

export class PortfolioModule {}
```
If at least one parameter (specific to the `LogService`) is defined in a module configuration, the `CoreModule` will create and inject a `LogService` specific for that particular lazy loaded module.

## How to log in the browser console

As we have mentioned before, the appender responsible to log in the browser console is `ConsoleAppender`. The messages created with the `LogService` or `Logger` are sent to the console as they are. For example:
```javascript
this.log.error('Error in my method', e);
```
will, eventually, call:
```javascript
console.error('Error in my method', e);
```
Most of the time, though, we need additional information about the messages, like the log level, log time, the name of the logger who created the log, etc. This can be achieved defining a prefix, as mentioned in the `Configuration` chapter. For example:
```javascript
export const appConfig: EuiAppConfig = {
    ...
    log: {
        logLevel: LogLevel.INFO,
        logAppenders: [{
            type: ConsoleAppender,    
            prefixFormat: '[{level}] [{time}] [{logger}]',
        }],
    },
    ...
};
```
The following code:

> this.logger = log.getLogger('MyApp.MyComponent');  
> [this.logger.info](http://this.logger.info)('Data loaded:', { data: { time: new Date() } });

Will print this in the browser console:

> [INFO] [12:34:56 PM] [MyApp.MyComponent] Data loaded: {data: {…}}

## How to send the logs on a server

Simply using an `UrlAppender`. For example:
```javascript
export const appConfig: EuiAppConfig = {
    ...
    log: { 
        logLevel: LogLevel.INFO,  
        logAppenders: [{  
            type: UrlAppender,  
            url: 'https://logging.is.awesome',  
        }],
    },
    ...
};
```
The `url` param is mandatory for the `UrlAppender`. It must be a POST, accepting a json object as body, in this format:
```javascript
{  
    /** event's log level */  
    level: LogLevel;  
    /** event's log level name */  
    levelName: string;  
    /** the name of the logger who triggered the event */  
    loggerName: string;  
    /** event's timestamp */  
    timestamp: Date;  
    /** log messages */  
    messages: any[];  
    /** the code position from where the log has been triggered */  
    position?: {  
        file: string;  
        line: number;  
        column: number;  
    };  
    /** the url of the current page */  
    location?: string;  
}
```
The `position` and `location` are not provided, by default. In order to have them, you need to specify another parameter, called `detailedEventFromLevel`.
```javascript
export const appConfig: EuiAppConfig = {
    ...
    log: {
        logLevel: LogLevel.INFO,  
        logAppenders: [{  
            type: UrlAppender,  
            url: '[https://logging.is.awesome](https://logging.is.awesome)',  
            detailedEventFromLevel: LogLevel.ERROR,  
        }],
    },
    ...
};
```
In this case, the appender is sending to the server logs from level `INFO` and is adding the `position` and `location` from the level `ERROR`.

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-logservice-initiate?embed=1&file=src/config/index.ts&hideNavigation=1"></iframe>)
