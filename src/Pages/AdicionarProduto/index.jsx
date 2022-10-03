import styles from './AdicionarProduto.module.scss';
import Button from '../../components/Button';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { HeaderContext } from '../../Context/HeaderContext';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdicionarProduto() {

    const [valores, setValores] = useState({
        titulo: 'Adicionar novo produto',
        botao: 'Adicionar produto',
        imagem: '',
        categoria: '',
        nome: '',
        preco: '',
        descricao: ''
    });

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            imagem: valores.imagem,
            categoria: valores.categoria,
            nome: valores.nome,
            preco: valores.preco,
            descricao: valores.descricao
        }
    });

    let { id } = useParams();

    useEffect(() => {
        (async () => {
            if (id != undefined) {
                const resposta = await fetch(`http://localhost:3000/produtos/${id}`);
                const produto = await resposta.json();
                setValores({
                    titulo: 'Editar o produto',
                    botao: 'Editar Produto',
                    imagem: produto.imagem,
                    categoria: produto.categoria,
                    nome: produto.nome,
                    preco: produto.preco,
                    descricao: produto.descricao
                });
            }
        })();

    }, []);

    useEffect(() => {
        
        setValue('imagem', valores.imagem);
        setValue('categoria', valores.categoria);
        setValue('nome', valores.nome);
        setValue('preco', valores.preco);
        setValue('descricao', valores.descricao);

    }, [valores]);

    const { setPage } = useContext(HeaderContext);

    let navigate = useNavigate();


    useEffect(() => {
        setPage(true);

    });




    const onSubmit = data => {

        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        navigate('/dashboard');
    };

    return (
        <main>
            <section className={classNames(styles.adicionar, 'container')}>
                <h2 className={styles.adicionar__titulo}>{valores.titulo}</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)} className={styles.adicionar__formulario}>
                    <div className={styles.inputBox}>
                        <label htmlFor="">URL da imagem</label>
                        <input  {...register('imagem', { required: true })} type="text" />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Categorias</label>
                        <input   {...register('categoria', { required: true })} type="text" />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Nome do produto</label>
                        <input   {...register('nome', { required: true })} type="text" />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Preço do produto</label>
                        <input   {...register('preco', { required: true })} type="text" />
                    </div>
                    <div className={styles.inputBox}>
                        <textarea  {...register('descricao', { required: true })} type="text" placeholder='Descrição do produto'>

                        </textarea>
                    </div>
                    <Button color={'primario'}>{valores.botao}</Button>
                </form>
            </section>
        </main>
    );
}