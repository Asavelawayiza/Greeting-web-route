create table allnames(
    id serial not null primary key,
    location text not null,
    greet_count int not null,
    greet_name text not null,
    help boolean not null,
    information text
);
