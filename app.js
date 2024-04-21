window.addEventListener("load", solve);

function solve() {
  let publishButton = document.getElementById('publish-btn');
  let titleInputField = document.getElementById('task-title');
  let categoryInputField = document.getElementById('task-category');
  let contentInputField = document.getElementById('task-content');
  let allInputFields = [];
  allInputFields.push(titleInputField);
  allInputFields.push(categoryInputField);
  allInputFields.push(contentInputField);

  let reviewListElement = document.getElementById('review-list');
  let publishedListElement = document.getElementById('published-list');
  let taskId = 1;

  publishButton.addEventListener('click', e=>createTask());

  function createTask(){
    if (allInputFields.find(f=>!f.value)){
        return;
    }

    let listElement = document.createElement('li');
    listElement.classList.add('rpost');
    listElement.setAttribute('id', taskId);
    taskId++;
    let articleElement = document.createElement('article');

    let h4Element = document.createElement('h4');
    h4Element.textContent = titleInputField.value;
    articleElement.appendChild(h4Element);

    let pCategoryElement = document.createElement('p');
    pCategoryElement.textContent = `Category: ${categoryInputField.value}`;
    articleElement.appendChild(pCategoryElement);

    let pContentElement = document.createElement('p');
    pContentElement.textContent = `Content: ${contentInputField.value}`;
    articleElement.appendChild(pContentElement);

    listElement.appendChild(articleElement);

    let buttonEditElement = document.createElement('button');
    buttonEditElement.classList.add('action-btn');
    buttonEditElement.classList.add('edit');
    buttonEditElement.textContent = 'Edit';
    listElement.appendChild(buttonEditElement);
    buttonEditElement.addEventListener('click', e=>editPost(e));

    let buttonPostElement = document.createElement('button');
    buttonPostElement.classList.add('action-btn');
    buttonPostElement.classList.add('post');
    buttonPostElement.textContent = 'Post';
    listElement.appendChild(buttonPostElement);
    buttonPostElement.addEventListener('click', e=>postTask(e));

    reviewListElement.appendChild(listElement);

    allInputFields.forEach(f=>f.value=null);
  }

  function editPost(e){
    let id = e.target.parentNode.getAttribute('id');
    titleInputField.value = e.target.parentNode.getElementsByTagName('h4')[0].textContent;
    categoryInputField.value = e.target.parentNode.getElementsByTagName('p')[0].textContent.split('Category: ')[1];
    contentInputField.value = e.target.parentNode.getElementsByTagName('p')[1].textContent.split('Content: ')[1];

    document.getElementById(id).remove();
  }

  function postTask(e){
    let id = e.target.parentNode.getAttribute('id');
    let parentElement = e.target.parentNode;
    Array.from(parentElement.getElementsByTagName('button')).forEach(e=>e.remove());
    parentElement.remove();
    publishedListElement.appendChild(parentElement);
  }
}