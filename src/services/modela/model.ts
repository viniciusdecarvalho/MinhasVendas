import { Model } from "../firebase";

export class Cidade extends Model {
	nome: string;
	uf: string;
}

export interface Endereco {
	cep?: string;
	logradouro?: string;
	numero?: string;
	complemento?: string;
	bairro?: string;
	cidade?: Cidade;
}

export interface Contato {
	residencial?: string;
	comercial?: string;
	celular?: string;
	email?: string;
}

export abstract class Pessoa extends Model {
	nome: string;
	foto?: string;
	sexo?: 'm' | 'f';
	dataNascimento?: string;
	cpf?: string;
	rg?: string;
	estadoCivil?: 'solteiro' | 'casado' | 'divorciado' | 'viuvo';
	profissao?: string
	endereco?: Endereco
	contato?: Contato
}

export class Cliente extends Pessoa {
	peso?: string
	altura?: string
	imc?: string
	profissao?: string
	indicacao?: string
	observacoes?: string
}

export class Fornecedor extends Model {
    nome: string
}

export class Produto extends Model {
    codigo: string
    codigoBarra: string
    foto: string
    descricao: string
    precoCusto: number
    precoVenda: number
    quantidadeEstoqueAtual: number
    quantidadeEstoqueMinimo: number
}

class EventoMovimentacaoProduto {
    constructor (
        public id: number,
        public tipo: 'E' | 'S',
        public descricao: string
    ) {}
}

export const EventosMovimentacaoProduto = {
    DEVOLUCAO_CLIENTE: new EventoMovimentacaoProduto(101, 'E', 'Devoluçåo do Cliente'),
    COMPRA: new EventoMovimentacaoProduto(102, 'E', 'Compra'),
    AJUSTE_ENTRADA: new EventoMovimentacaoProduto(103, 'E', 'Ajuste Estoque'),
    TRANSFERENCIA_ENTRADA: new EventoMovimentacaoProduto(104, 'E', 'Transferencia'),

    DEVOLUCAO_FORNECEDOR: new EventoMovimentacaoProduto(201, 'S', 'Devoluçåo do Fornecedor'),
    VENDA: new EventoMovimentacaoProduto(202, 'S', 'Venda'),
    AJUSTE_SAIDA: new EventoMovimentacaoProduto(203, 'S', 'Ajuste Estoque'),
    TRANSFERENCIA_SAIDA: new EventoMovimentacaoProduto(204, 'S', 'Transferencia'),
}

export class MovimentacaoProduto extends Model {
    data: Date
    evento: EventoMovimentacaoProduto
    quantidade: number
    preco: number
}
