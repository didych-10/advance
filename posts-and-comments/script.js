
// let comments = [];

// async function getComments() {
//     try {
//         return new Promise((resolve, reject) => {
//             fetch('https://jsonplaceholder.ypicode.com/comments', {
//                 method: 'get'
//             }).then(res => res.json())
//             .then(comments => resolve(comments))
//             .catch(err => {
//                 // throw new Error("Something with request");
//                 reject(err);
//             });
//         });
//     } catch (err) {
//         alert(err);
//     }
    
// }

// async function main() {
//     try {
//         console.log('');
//         comments = await getComments();
//         console.log('2');
//         console.log(comments);
//     } catch (err) {
//         alert(err);
//     }
// }

// main(); 


// // var data = "Has Error"; // в данных ошибка

// // try {

// //   var user = JSON.parse(data); // <-- ошибка при выполнении

// //   alert( user.name ); // не сработает

// // } catch (e) {
// //   // ...выполнится catch
// //   alert( "Извините, в данных ошибка, мы попробуем получить их ещё раз" );
// //   alert( e.name );
// //   alert( e.message );
// // }


let posts = [];
let comments = [];

async function getPosts() {
    try {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'get'
            }).then(res => res.json())
            .then(res=> resolve(res))
            .catch(err => reject('Something with fetch'));
        })
    } catch (err) {
        alert(err);
    }
}

async function getComments() {
    try {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'get'
            }).then(res => res.json())
            .then(res=> resolve(res))
            .catch(err => reject('Something with fetch'));
        })
    } catch (err) {
        alert(err);
    }
}

function concatPostsAndComments(posts, comments) {
    comments.forEach((comment, index) => {
        const postId = comment.postId;

        let findedPost = posts.find(post => post.id === postId);
        if(findedPost.hasOwnProperty('comments')) {
            findedPost.comments.push(comment);
        } else {
            findedPost.comments = [];
            findedPost.comments.push(comment);
        }
    });
}

function styleDiv(div,w,h) {
    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.style.overflow = 'scroll';
    div.style.border = '1px solid black';
    div.style.padding = '10px';
}

function drawBlocks(posts) {
    posts.forEach(post=> {
        let mainDiv = document.createElement('div');
        styleDiv(mainDiv, '450', '450');
        mainDiv.style.margin = '100px';
        mainDiv.style.borderRadius = '5px';
        mainDiv.style.boxShadow = '13px -11px 15px 0px rgba(0,0,0,0.75)';
        mainDiv.style.textAlign = 'center';

        mainDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>Comments:</p>
        `;

        post.comments.forEach(comment => {
            let div = document.createElement('div');
            styleDiv(div, '260', '160');
            div.style.margin = '15px';
            div.style.backgroundColor = '#989292';
            div.style.borderRadius = '3px 44px 44px 44px';
            

            div.innerHTML = `
                <h5>${comment.email}</h5>
                <span>${comment.body}</span>
            `;
            mainDiv.append(div);
        });

        document.body.append(mainDiv);
    });
}

async function main() {
    try {
        posts = await getPosts();
        comments = await getComments();
    
        concatPostsAndComments(posts,comments);

        
        drawBlocks(posts);

    } catch (err) {
        alert(err);
    }
    
}

main();

