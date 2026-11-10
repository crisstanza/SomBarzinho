export type Song = {
  Id: number;
  author: string;
  Capo: number;
  content: string;
  hash: string;
  key: number;
  KeyShift: number;
  name: string;
  subTitle: string;
  type: number;
  ModifiedDateTime: string;
  Deleted: boolean;
  SyncId: string;
  timeSig: string;
  ZoomFactor: number;
  Duration: number;
  Duration2: number;
  _displayParams: string;
  TempoInt: number;
  _tags: string;
  Url: string;
  DeepSearch: string;
  Copyright: string;
  NotesText: string;
  Zoom: number;
  SectionOrder: string;
  SongNumber: number;
  HasChildren: number;
  ParentId: number;
  vName: string | null;
  locked: number;
  LinkedAudio: string | null;
  Chords: unknown | null;
  midiOnLoad: unknown | null;
  _folders: string;
  drawingPathsBackup: unknown | null;
};

export type SetDetails = {
  Id: number;
  name: string;
  date: string;
  ModifiedDateTime: string;
  Deleted: number;
  SyncId: string;
};

export type SetContent = {
  Id: number;
  Order: number;
  Capo: number;
  SetId: number;
  SongId: number;
  keyOfset: number;
  ModifiedDateTime: string;
  Deleted: number;
  SyncId: string;
  NotesText: string | null;
  SectionOrder: string;
  ItemType: number;
  Content: string;
  drawingPathsBackup: unknown | null;
};

export type SongSet = {
  details: SetDetails;
  contents: SetContent[];
};

export type SongsCollection = {
  songs: Song[];
  sets: SongSet[];
  folders: unknown[];
};
