import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

export const TASK_NAME = "task-name";

export async function isTMAvailable() {
  return TaskManager.isAvailableAsync();
}

async function Task(): Promise<BackgroundFetch.BackgroundFetchResult> {
  return BackgroundFetch.BackgroundFetchResult.NoData;
}

TaskManager.defineTask(TASK_NAME, Task);

export function isTaskDefined() {
  return TaskManager.isTaskDefined(TASK_NAME);
}

export async function isTaskRegistered() {
  return TaskManager.isTaskRegisteredAsync(TASK_NAME);
}


export async function registerTask() {
  return BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 5 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

export async function unregisterTask() {
  return BackgroundFetch.unregisterTaskAsync(TASK_NAME);
}
