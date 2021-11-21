import { db } from "../services/Firebase";
import { push, ref, update, remove, onValue } from "@firebase/database";

const addLivro = (dados) => {
    if(dados.includes("")){
        alert('Alguns campos inseridos são inválidos')
        return
    }

    push(ref(db, '/livros'), {
        anoPublicacao: dados.anoPublicacao,
        autor: dados.autor,
        descricao: dados.descricao,
        edicao: dados.edicao,
        isbn: dados.isbn,
        qtdDownloads: dados.qtdDownloads,
        qtdPaginas: dados.qtdPaginas,
        titulo: dados.titulo,
        urlArquivo: dados.urlArquivo,
        urlCapa: dados.urlCapa
    })
        .then(() => {
            alert('Livro cadastrado com sucesso!')
            return true
        })
        .catch((error) => {
            alert('Houve um erro ao realizar o cadastro!')
            console.log(error)
            return false
        })
}

const updLivro = (dados) => {
    if(dados.includes("")){
        alert('Alguns campos inseridos são inválidos')
        return
    }

    const updateDados = {
        anoPublicacao: dados.anoPublicacao,
        autor: dados.autor,
        descricao: dados.descricao,
        edicao: dados.edicao,
        isbn: dados.isbn,
        qtdDownloads: dados.qtdDownloads,
        qtdPaginas: dados.qtdPaginas,
        titulo: dados.titulo,
        urlArquivo: dados.urlArquivo,
        urlCapa: dados.urlCapa
    }

    const updates = {}
    updates['livros/' + dados.id] = updateDados

    update(ref(db), updates)
            .then(() => {
                alert('Livro editado com sucesso!')
                return true
            })
            .catch((error) => {
                alert('Houve um erro ao editar o livro')
                console.log(error)
                return false
            }) 
}

const delLivro = (id) => {
    remove(ref(db, 'livros/' + id))
            .then(() => {
                alert('Livro removido com sucesso')
                return true
            })
            .catch((error) => {
                alert('Não foi possível remover o livro')
                console.log(error)
                return false
            })
}

export {
    addLivro,
    updLivro,
    delLivro
}