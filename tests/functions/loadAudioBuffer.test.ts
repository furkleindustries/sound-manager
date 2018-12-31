import {
  loadAudioBuffer,
} from '../../src/functions/loadAudioBuffer';

let openMock: jest.Mock;
let sendMock: jest.Mock;
let xhr: any;
const mockXHR = (opts?: object) => {
  openMock = jest.fn();
  sendMock = jest.fn();

  // @ts-ignore
  window.XMLHttpRequest = jest.fn(() => {
    xhr = {
      ...opts,
      open: openMock,
      send: sendMock,
    };

    return xhr;
  });
};

describe('loadAudioBuffer unit tests.', () => {
  beforeEach(() => {
    mockXHR();
  });

  it('Returns a promise.', () => {
    expect(loadAudioBuffer('fdsfds', {} as any)).toBeInstanceOf(Promise);
  });

  it('Generates an XMLHttpRequest.', () => {
    loadAudioBuffer('fsfsdfs', {} as any);
    expect(XMLHttpRequest).toBeCalledTimes(1);
  });

  it('Calls open on the XMLHttpRequest to issue a GET to the provided url.', () => {
    const url = 'fdsjkfds';
    loadAudioBuffer(url, {} as any);

    expect(openMock).toBeCalledTimes(1);
    expect(openMock).toBeCalledWith('GET', url);
  });

  it('Calls send on the XMLHttpRequest.', () => {
    const url = 'fdsjkfds';
    loadAudioBuffer(url, {} as any);

    expect(sendMock).toBeCalledTimes(1);
  });

  it('Rejects if the XHR errors out.', () => {
    const url = 'fdskfdskfds';
    return expect(new Promise((_, reject) => {
      loadAudioBuffer(url, {} as any).catch((a) => reject(a));
      xhr.onerror();
    })).rejects.toBeTruthy();
  });

  it('Resolves with the decoded buffer if the XHR loads and the payload decodes correctly.', () => {
    const url = 'fdskfdskfds';
    const sym = Symbol('buffer');
    let callback: Function;
    const context = {
      decodeAudioData: jest.fn((_, cb) => callback = cb),
    } as any;

    return expect(new Promise((resolve) => {
      loadAudioBuffer(url, context).then((a) => resolve(a));
      xhr.onload();
      callback(sym);
    })).resolves.toBe(sym);
  });

  it('Rejects if the XHR loads but there is an error decoding the payload.', () => {
    const url = 'fdskfdskfds';
    const sym = Symbol('buffer');
    let callback: Function;
    const context = {
      decodeAudioData: jest.fn((_, _2, cb) => callback = cb),
    } as any;

    return expect(new Promise((_, reject) => {
      loadAudioBuffer(url, context).catch((a) => reject(a));
      xhr.onload();
      callback(sym);
    })).rejects.toBe(sym);
  });
});
