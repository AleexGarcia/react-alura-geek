import styles from './ProdutoPage.module.scss';
import dados from '../../Data/produtos.json';
import Produto from '../../components/Produto';
export default function ProdutoPage() {
    let produto = dados[0];
    let similares = dados.filter(produto => produto.categoria === 'StarWars');
    return (
        <main>
            <figure className={styles.produto}>
                <img className={styles.produto__imagem} src={produto.imagem} alt="" />
                <figcaption>
                    <h2>{produto.nome}</h2>
                    <span>R$ {produto.preco}</span>
                    <p>{produto.descricao}</p>
                </figcaption>
            </figure>
            <div className={styles.similares}>
                <h2 className={styles.similares__titulo}>Produtos Similares</h2>
                <div className={styles.similares__produtos}>
                    {similares.map((produto, index) => (
                        <Produto
                            key={index}
                            imagem={produto.imagem}
                            nome={produto.nome}
                            preco={produto.preco}
                            id={produto.id}
                        >Ver produto</Produto>
                    ))}
                </div>
            </div>
        </main>
    );
}