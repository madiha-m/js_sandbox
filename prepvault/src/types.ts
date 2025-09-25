export interface Card {
    id: string;
    question: string;
    answer: string;
    tags: string[];
    bookmarked: boolean;
    createdAt: string;
    updatedAt: string;
    history: any[];
    open?: boolean;
}