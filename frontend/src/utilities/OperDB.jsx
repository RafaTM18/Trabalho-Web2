import { db } from "../services/Firebase";
import { push, ref, update, remove, onValue } from "@firebase/database";

const getsLivro = async () => {
    const dictLivros = {}
    const livros = ref(db, '/livros')
    onValue(livros, (snapshot) => {
        snapshot.forEach(
            (dado) => {
                dictLivros[dado.key] = dado.val()
            }
        )
    })

    return dictLivros
}

const getLivro = async (id) => {
    let livro = undefined
    const livros = ref(db, 'livros/')
    onValue(livros, (snapshot) => {
        snapshot.forEach(
            (dado) => {
                if(dado.key === id){
                    livro = dado.val()
                }
            }
        )
    })

    return livro
}

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
    getsLivro,
    getLivro,
    addLivro,
    updLivro,
    delLivro
}