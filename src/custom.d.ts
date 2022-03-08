type RootState = {
    recordList: RecordItem[],
    createRecordError: Error | null,
    createTagError: Error | null,
    tagList: Tag[],
    currentTag?: Tag
}
type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number // 数据类型
    createdAt?: string // 类
}

type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'  //联合类型
    update: (id: string, name: string) => 'success' | 'not Found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}

interface Store {
    tagList: Tag[];
    createTag: (name: string) => void;
    findTag: (id: string) => Tag | undefined;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => 'success' | 'not Found' | 'duplicated';
    recordList: RecordItem[];
    createRecord: (record: RecordItem) => void;
}

