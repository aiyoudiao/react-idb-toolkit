/**
 * @description IndexedDBUtils is a utility module for managing IndexedDB operations.
 */

import { IndexedDBHelper, IndexedDBOptions } from "./IndexedDBHelper";

let dbHelper: IndexedDBHelper | null = null;

/**
 * Initialize IndexedDB (make sure it is initialized only once)
 */
export async function initIndexedDB(options: IndexedDBOptions) {
  if (!dbHelper) {
    dbHelper = new IndexedDBHelper(options);
    await dbHelper.init();
  }
  return dbHelper;
}

/**
 * Get the current IndexedDBHelper instance (must be initialized first)
 */
export function getIndexedDBHelper(): IndexedDBHelper {
  if (!dbHelper) {
    throw new Error(
      "IndexedDB is not ready yet. Please call initIndexedDB() first."
    );
  }
  return dbHelper;
}

/**
 * Set the dbHelper to null (for testing purposes)
 */
export async function __setDBNull(): Promise<void> {
  dbHelper = null;
}
