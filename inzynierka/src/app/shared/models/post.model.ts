export class PostInput {
    series_id : number;
    title : string;
    creator : string;
    genre : string;
    production : string;
    premiere : string;
    description : string;
    url : string;
}
export class PostInputById {
    series_id : number;
    title : string;
    creator : string;
    genre : string;
    production : string;
    premiere : string;
    description : string;
    url : string;
    post_creator: string;
    creation_date: string;

}
export class PostInputByTitle {
    series_id : number;
    title : string;
    creator : string;
    genre : string;
    production : string;
    premiere : string;
    description : string;
    url : string;
    post_creator: string;
    creation_date: string;
}
export class CommentsInput {
    comment_id: number;
    creator: string;
    comment: string;
    serie_id: number;
    date: string;
}
export class PostOutput {
    title : string;
    creator : string;
    genre : string;
    production : string;
    premiere : string;
    description : string;
}