/**
 * Global test setup — suppress jsdom "Could not parse CSS stylesheet" noise.
 *
 * jsdom emits this via its virtualConsole "jsdomError" event, which pipes
 * to process.stderr. We intercept stderr.write to filter these out.
 */

const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = (chunk: Uint8Array | string, ...args: unknown[]): boolean => {
    const text = typeof chunk === 'string' ? chunk : Buffer.from(chunk).toString();
    if (text.includes('Could not parse CSS stylesheet')) {
        return true;
    }
    return (originalStderrWrite as Function)(chunk, ...args);
};
