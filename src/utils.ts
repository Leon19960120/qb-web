import _ from 'lodash';
import { StateType } from './consts';

const dlState = ['downloading', 'metaDL', 'stalledDL', 'checkingDL', 'pausedDL', 'queuedDL', 'forceDL', 'allocating'];
const upState = ['uploading', 'stalledUP', 'checkingUP', 'queuedUP', 'forceUP'];
const completeState = ['uploading', 'stalledUP', 'checkingUP', 'pausedUP', 'queuedUP', 'forceUP'];
const activeState = ['metaDL', 'downloading', 'forceDL', 'uploading', 'forcedUP', 'moving'];
const errorState = ['error', 'missingFiles'];

export function torrentIsState(type: StateType, state: string) {
  let result;
  switch (type) {
    case StateType.Downloading: {
      result = dlState.includes(state);
      break;
    }
    case StateType.Seeding: {
      result = upState.includes(state);
      break;
    }
    case StateType.Completed: {
      result = completeState.includes(state);
      break;
    }
    case StateType.Resumed:
    case StateType.Paused: {
      const paused = state.startsWith('paused');
      result = type === StateType.Paused ? paused : !paused;
      break;
    }
    case StateType.Active:
    case StateType.Inactive: {
      const active = activeState.includes(state);
      result = type === StateType.Active ? active : !active;
      break;
    }
    case StateType.Errored: {
      result = errorState.includes(state);
      break;
    }
  }

  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function codeToFlag(code: string) {
  const magicNumber = 0x1F1A5;

  code = code.toUpperCase();
  const codePoints = [...code].map((c) => magicNumber + c.charCodeAt(0));
  const char = String.fromCodePoint(...codePoints);
  const url = 'https://cdn.jsdelivr.net/npm/twemoji/2/svg/' +
    `${codePoints[0].toString(16)}-${codePoints[1].toString(16)}.svg`;

  return {
    char,
    url,
  };
}

export const isWindows = navigator.userAgent.includes('Windows');
