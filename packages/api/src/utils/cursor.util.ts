export interface PaginationCursor {
  createdAt: Date;
  id: number;
}

export function encodeCursor(cursor: PaginationCursor): string {
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}

export function decodeCursor(cursor: string): PaginationCursor {
  return JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
}
