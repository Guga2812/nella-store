"use client";

import React, { useMemo, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Star,
  User,
  X,
  CreditCard,
  ShieldCheck,
  Truck,
  Package,
  Users,
  BadgePercent,
  Mail,
  Instagram,
  Facebook,
  Phone,
  Filter,
  Sparkles,
  Gift,
  ArrowRight,
} from "lucide-react";

type RouteKey =
  | "home"
  | "shop"
  | "cart"
  | "checkout"
  | "account"
  | "admin"
  | "wishlist"
  | "template";

type Product = {
  id: number;
  name: string;
  category: string;
  gender: string;
  age: string;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  image: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
};

type CartItem = Product & {
  qty: number;
  size: string;
  color: string;
};

const productsSeed: Product[] = [
  {
    id: 1,
    name: "Vestido Jardim Encantado",
    category: "Vestidos",
    gender: "Menina",
    age: "2 a 6 anos",
    price: 129.9,
    oldPrice: 159.9,
    stock: 12,
    rating: 4.8,
    reviews: 42,
    sizes: ["2", "4", "6", "8"],
    colors: ["Rosa", "Lilás", "Creme"],
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80",
    description:
      "Vestido delicado, confortável e perfeito para ocasiões especiais.",
    featured: true,
    isNew: true,
  },
  {
    id: 2,
    name: "Conjunto Aventura Kids",
    category: "Conjuntos",
    gender: "Menino",
    age: "3 a 8 anos",
    price: 99.9,
    oldPrice: 119.9,
    stock: 18,
    rating: 4.7,
    reviews: 35,
    sizes: ["3", "4", "6", "8"],
    colors: ["Azul", "Verde", "Bege"],
    image:
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80",
    description: "Conjunto moderno e confortável para o dia a dia.",
    featured: true,
  },
  {
    id: 3,
    name: "Body Nuvem de Algodão",
    category: "Bebê",
    gender: "Unissex",
    age: "0 a 18 meses",
    price: 49.9,
    oldPrice: 59.9,
    stock: 24,
    rating: 4.9,
    reviews: 50,
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Azul", "Rosa"],
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80",
    description: "Body macio e ideal para os primeiros meses.",
    featured: true,
    isNew: true,
  },
  {
    id: 4,
    name: "Tênis Mini Passos",
    category: "Calçados",
    gender: "Unissex",
    age: "1 a 8 anos",
    price: 119.9,
    oldPrice: 139.9,
    stock: 10,
    rating: 4.7,
    reviews: 23,
    sizes: ["20", "22", "24", "26"],
    colors: ["Branco", "Bege", "Rosa"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    description: "Calçado leve, seguro e estiloso.",
  },
  {
    id: 5,
    name: "Kit Laços Encanto",
    category: "Acessórios",
    gender: "Menina",
    age: "Bebê ao juvenil",
    price: 39.9,
    oldPrice: 49.9,
    stock: 30,
    rating: 4.9,
    reviews: 31,
    sizes: ["Único"],
    colors: ["Sortido"],
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    description: "Acessórios delicados para completar looks infantis com charme.",
    isNew: true,
  },
  {
    id: 6,
    name: "Camisa Mini Style",
    category: "Camisas",
    gender: "Menino",
    age: "6 a 12 anos",
    price: 79.9,
    stock: 16,
    rating: 4.6,
    reviews: 19,
    sizes: ["8", "10", "12", "14"],
    colors: ["Azul", "Branco"],
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    description: "Camisa elegante e divertida para produções com personalidade.",
  },
];

const categories = [
  "Todos",
  "Bebê",
  "Vestidos",
  "Conjuntos",
  "Camisas",
  "Acessórios",
  "Calçados",
];

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

function ProductCard({
  product,
  wished,
  onToggleWish,
  onAddCart,
}: {
  product: Product;
  wished: boolean;
  onToggleWish: (id: number) => void;
  onAddCart: (product: Product) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-rose-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => onToggleWish(product.id)}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow"
        >
          <Heart
            className={`h-5 w-5 ${
              wished ? "fill-rose-400 text-rose-400" : "text-slate-500"
            }`}
          />
        </button>

        <div className="absolute left-4 top-4 flex gap-2">
          {product.isNew ? (
            <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-600">
              Novo
            </span>
          ) : null}
          {product.featured ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              Destaque
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-500">
          {product.category} • {product.gender}
        </p>

        <h3 className="mt-1 min-h-[56px] text-lg font-semibold text-slate-800">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-amber-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm text-slate-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-2xl font-bold text-slate-800">
            {formatBRL(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatBRL(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {product.description}
        </p>

        <button
          onClick={() => onAddCart(product)}
          className="mt-4 w-full rounded-2xl bg-rose-400 px-4 py-3 font-medium text-white transition hover:bg-rose-500"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}

function SummaryCard({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <aside className="h-fit rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-800">Resumo do pedido</h3>
      <div className="mt-4 space-y-3 text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-rose-100 pt-3 text-lg font-bold text-slate-800">
          <span>Total</span>
          <span>{formatBRL(total)}</span>
        </div>
      </div>
    </aside>
  );
}

export default function NellaStore() {
  const [route, setRoute] = useState<RouteKey>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(productsSeed);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [userName] = useState("Cliente Nella");
  const [checkoutName, setCheckoutName] = useState("Cliente Nella");
  const [checkoutEmail, setCheckoutEmail] = useState("cliente@nella.com");
  const [checkoutAddress, setCheckoutAddress] = useState("Rua das Flores, 123");
  const [checkoutCity, setCheckoutCity] = useState("São Paulo");
  const [paymentMethod, setPaymentMethod] = useState("Pix");
  const [orderDone, setOrderDone] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterCount, setNewsletterCount] = useState(0);
  const [adminForm, setAdminForm] = useState({
    name: "",
    category: "Vestidos",
    price: "",
    stock: "",
    description: "",
  });

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory = category === "Todos" || product.category === category;
      const haystack = `${product.name} ${product.category} ${product.gender}`.toLowerCase();
      const matchesSearch = haystack.includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const shipping = subtotal >= 299 || subtotal === 0 ? 0 : 19.9;
  const total = subtotal + shipping;

  const toggleWish = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.findIndex((item) => item.id === product.id);
      if (existing >= 0) {
        return prev.map((item, index) =>
          index === existing ? { ...item, qty: Math.min(item.qty + 1, item.stock) } : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
          size: product.sizes[0] ?? "Único",
          color: product.colors[0] ?? "Padrão",
        },
      ];
    });
    setRoute("cart");
  };

  const updateQty = (index: number, delta: number) => {
    setCart((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        return { ...item, qty: Math.max(1, Math.min(item.qty + delta, item.stock)) };
      })
    );
  };

  const removeCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const finishOrder = () => {
    if (!cart.length) return;
    setOrderDone(true);
    setCart([]);
    setRoute("account");
  };

  const saveNewsletter = () => {
    if (!newsletterEmail.trim()) return;
    setNewsletterCount((prev) => prev + 1);
    setNewsletterEmail("");
  };

  const saveProduct = () => {
    if (!adminForm.name || !adminForm.price) return;

    const newProduct: Product = {
      id: Date.now(),
      name: adminForm.name,
      category: adminForm.category,
      gender: "Unissex",
      age: "Bebê ao juvenil",
      price: Number(adminForm.price),
      stock: Number(adminForm.stock || 0),
      rating: 4.5,
      reviews: 0,
      sizes: ["Único"],
      colors: ["Padrão"],
      image:
        "https://images.unsplash.com/photo-1519238359922-989348752efb?auto=format&fit=crop&w=1200&q=80",
      description: adminForm.description || "Novo produto cadastrado no painel.",
    };

    setProducts((prev) => [newProduct, ...prev]);
    setAdminForm({
      name: "",
      category: "Vestidos",
      price: "",
      stock: "",
      description: "",
    });
  };

  const navItems = [
    { key: "home" as RouteKey, label: "Início" },
    { key: "shop" as RouteKey, label: "Loja" },
    { key: "account" as RouteKey, label: "Minha conta" },
    { key: "admin" as RouteKey, label: "Admin" },
    { key: "template" as RouteKey, label: "Template" },
  ];

  const renderHome = () => (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-medium text-rose-600 shadow-sm">
              <Sparkles className="h-4 w-4" /> Nova coleção pastel da Nella Store
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-800 md:text-6xl">
              Moda infantil com cara de carinho, leveza e alegria.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Looks encantadores para menino e menina, do bebê ao juvenil, com estética suave, elegante e divertida.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setRoute("shop")}
                className="rounded-2xl bg-rose-400 px-6 py-4 font-semibold text-white transition hover:bg-rose-500"
              >
                Comprar agora
              </button>

              <button
                onClick={() => setRoute("template")}
                className="rounded-2xl border border-rose-200 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-rose-50"
              >
                Ver estrutura do template
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Frete rápido", Truck],
                ["Pagamento seguro", ShieldCheck],
                ["Pix, crédito e débito", CreditCard],
              ].map(([label, Icon]) => {
                const Component = Icon as React.ComponentType<{ className?: string }>;
                return (
                  <div
                    key={String(label)}
                    className="flex items-center gap-3 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm"
                  >
                    <Component className="h-5 w-5 text-rose-500" />
                    <span className="text-sm text-slate-600">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[30px] border border-white/70 shadow-xl sm:mt-12">
              <img
                src="https://images.unsplash.com/photo-1519238359922-989348752efb?auto=format&fit=crop&w=1200&q=80"
                alt="Moda infantil"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[30px] border border-white/70 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                  alt="Acessórios infantis"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="rounded-[30px] bg-white p-6 shadow-xl">
                <p className="text-sm uppercase tracking-[0.2em] text-rose-500">
                  Oferta especial
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  Frete grátis acima de {formatBRL(299)}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  Aproveite nossa seleção de peças delicadas e receba em casa com mais praticidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
            Destaques
          </p>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Produtos em destaque
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Peças com visual encantador e experiência de compra pronta para venda.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wished={wishlist.includes(product.id)}
              onToggleWish={toggleWish}
              onAddCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Gift,
              title: "Presentes especiais",
              text: "Peças lindas e delicadas para surpreender em aniversários, chás e datas especiais.",
            },
            {
              icon: Sparkles,
              title: "Estilo infantil elegante",
              text: "Uma identidade visual suave, moderna e pensada para encantar mães, pais e responsáveis.",
            },
            {
              icon: Truck,
              title: "Compra simples",
              text: "Vitrine, carrinho, checkout e painel admin já pensados para evoluir para produção.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );

  const renderShop = () => (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
          Loja
        </p>
        <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
          Catálogo da Nella Store
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Explore roupas, acessórios e calçados com visual infantil delicado e moderno.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[280px,1fr]">
        <aside className="h-fit rounded-[28px] border border-rose-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
            <Filter className="h-4 w-4" /> Filtros
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-600">Buscar</label>
              <div className="relative mt-2">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-rose-200 py-3 pl-11 pr-4 outline-none"
                  placeholder="Produto ou categoria"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wished={wishlist.includes(product.id)}
              onToggleWish={toggleWish}
              onAddCart={addToCart}
            />
          ))}
        </div>
      </div>
    </main>
  );

  const renderWishlist = () => {
    const wishedProducts = products.filter((product) =>
      wishlist.includes(product.id)
    );

    return (
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
            Favoritos
          </p>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Sua lista de desejos
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {wishedProducts.length ? (
            wishedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wished={true}
                onToggleWish={toggleWish}
                onAddCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[28px] border border-rose-100 bg-white p-10 text-center text-slate-600">
              Nenhum produto favoritado ainda.
            </div>
          )}
        </div>
      </main>
    );
  };

  const renderCart = () => (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 xl:grid-cols-[1.3fr,0.7fr]">
      <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
            Carrinho
          </p>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Seus produtos selecionados
          </h2>
        </div>

        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-3xl bg-rose-50 p-8 text-slate-600">
              Seu carrinho está vazio.
            </div>
          ) : null}

          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="grid gap-4 rounded-3xl border border-rose-100 p-4 md:grid-cols-[120px,1fr,auto]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-full rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Tamanho: {item.size} • Cor: {item.color}
                </p>
                <p className="mt-2 text-lg font-semibold text-rose-500">
                  {formatBRL(item.price)}
                </p>
              </div>

              <div className="flex items-end justify-between gap-3 md:flex-col">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 p-2">
                  <button
                    onClick={() => updateQty(index, -1)}
                    className="h-9 w-9 rounded-xl border bg-white"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(index, 1)}
                    className="h-9 w-9 rounded-xl border bg-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeCartItem(index)}
                  className="text-sm text-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        <SummaryCard subtotal={subtotal} shipping={shipping} total={total} />
        <button
          onClick={() => setRoute("checkout")}
          className="w-full rounded-2xl bg-slate-800 px-5 py-4 font-semibold text-white transition hover:bg-slate-900"
        >
          Ir para checkout
        </button>
      </div>
    </main>
  );

  const renderCheckout = () => (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 xl:grid-cols-[1.1fr,0.9fr]">
      <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
            Checkout
          </p>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Finalizar compra
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-600">Nome completo</label>
            <input
              value={checkoutName}
              onChange={(e) => setCheckoutName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">E-mail</label>
            <input
              value={checkoutEmail}
              onChange={(e) => setCheckoutEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Cidade</label>
            <input
              value={checkoutCity}
              onChange={(e) => setCheckoutCity(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Forma de pagamento</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none"
            >
              <option>Pix</option>
              <option>Cartão de Crédito</option>
              <option>Cartão de Débito</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-slate-600">Endereço</label>
            <input
              value={checkoutAddress}
              onChange={(e) => setCheckoutAddress(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
          </div>
        </div>

        <button
          onClick={finishOrder}
          className="mt-6 rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white hover:bg-emerald-600"
        >
          Confirmar pedido
        </button>
      </section>

      <SummaryCard subtotal={subtotal} shipping={shipping} total={total} />
    </main>
  );

  const renderAccount = () => (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:px-6 xl:grid-cols-[0.8fr,1.2fr]">
      <aside className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
        <div className="mb-6 max-w-3xl">
          <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
            Cliente
          </p>
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Minha conta
          </h2>
        </div>

        <div className="space-y-3 text-slate-700">
          <div className="rounded-2xl bg-rose-50 p-4">Nome: {userName}</div>
          <div className="rounded-2xl bg-rose-50 p-4">E-mail: {checkoutEmail}</div>
          <div className="rounded-2xl bg-rose-50 p-4">Cidade: {checkoutCity}</div>
          <div className="rounded-2xl bg-rose-50 p-4">
            Favoritos: {wishlist.length} itens
          </div>
        </div>
      </aside>

      <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-800">Área do cliente</h3>
        <p className="mt-4 leading-7 text-slate-600">
          Esta área está pronta para listar pedidos, favoritos e dados do cliente quando conectada ao backend real.
        </p>
        {orderDone ? (
          <div className="mt-6 rounded-3xl bg-emerald-50 p-5 text-emerald-800">
            Seu pedido foi criado com sucesso.
          </div>
        ) : null}
      </section>
    </main>
  );

  const renderAdmin = () => (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
          Painel administrativo
        </p>
        <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
          Gestão da Nella Store
        </h2>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Produtos", value: products.length, icon: Package },
          { label: "Clientes", value: 34, icon: Users },
          { label: "Pedidos", value: orderDone ? 1 : 0, icon: ShoppingBag },
          { label: "Faturamento", value: formatBRL(orderDone ? total : 0), icon: BadgePercent },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-slate-500">{item.label}</p>
                <Icon className="h-5 w-5 text-rose-400" />
              </div>
              <p className="mt-3 text-3xl font-black text-slate-800">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800">
            Cadastro rápido de produto
          </h3>

          <div className="mt-5 grid gap-4">
            <input
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              placeholder="Nome do produto"
              className="rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
            <select
              value={adminForm.category}
              onChange={(e) => setAdminForm({ ...adminForm, category: e.target.value })}
              className="rounded-2xl border border-rose-200 bg-white px-4 py-3 outline-none"
            >
              {categories
                .filter((item) => item !== "Todos")
                .map((item) => (
                  <option key={item}>{item}</option>
                ))}
            </select>
            <input
              value={adminForm.price}
              onChange={(e) => setAdminForm({ ...adminForm, price: e.target.value })}
              placeholder="Preço"
              className="rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
            <input
              value={adminForm.stock}
              onChange={(e) => setAdminForm({ ...adminForm, stock: e.target.value })}
              placeholder="Estoque"
              className="rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
            <textarea
              value={adminForm.description}
              onChange={(e) => setAdminForm({ ...adminForm, description: e.target.value })}
              placeholder="Descrição"
              rows={4}
              className="rounded-2xl border border-rose-200 px-4 py-3 outline-none"
            />
            <button
              onClick={saveProduct}
              className="rounded-2xl bg-rose-400 px-5 py-4 font-semibold text-white hover:bg-rose-500"
            >
              Salvar produto
            </button>
          </div>
        </section>

        <section className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-800">
            Produtos cadastrados
          </h3>
          <div className="mt-5 space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col gap-3 rounded-2xl border border-rose-100 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800">{product.name}</p>
                  <p className="text-sm text-slate-500">
                    {product.category} • Estoque {product.stock}
                  </p>
                </div>
                <span className="font-semibold text-slate-800">
                  {formatBRL(product.price)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );

  const renderTemplate = () => (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-rose-500">
          Template
        </p>
        <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
          Estrutura recomendada
        </h2>
        <p className="mt-3 leading-7 text-slate-600">
          Resumo da arquitetura para levar a Nella Store do navegador para um projeto real.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Frontend",
            items: ["Next.js", "Tailwind CSS", "Storefront", "Admin"],
          },
          {
            title: "Backend",
            items: ["NestJS", "Prisma", "PostgreSQL", "Swagger"],
          },
          {
            title: "Deploy",
            items: ["Vercel", "Railway", "Cloudinary", "GitHub Template"],
          },
        ].map((section) => (
          <div
            key={section.title}
            className="rounded-[28px] border border-rose-100 bg-white p-6 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-800">{section.title}</h3>
            <div className="mt-4 space-y-3 text-slate-600">
              {section.items.map((item) => (
                <div key={item} className="rounded-2xl bg-rose-50 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );

  const body =
    route === "home"
      ? renderHome()
      : route === "shop"
      ? renderShop()
      : route === "wishlist"
      ? renderWishlist()
      : route === "cart"
      ? renderCart()
      : route === "checkout"
      ? renderCheckout()
      : route === "account"
      ? renderAccount()
      : route === "admin"
      ? renderAdmin()
      : renderTemplate();

  return (
    <div className="min-h-screen bg-[#fff8f8] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-rose-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <button
            onClick={() => setRoute("home")}
            className="flex items-center gap-3 text-left"
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-300 via-pink-200 to-amber-200 text-white shadow-sm">
              N
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-800">
                Nella Store
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-rose-500">
                Moda infantil
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setRoute(item.key)}
                className="text-sm font-medium text-slate-600 transition hover:text-rose-500"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRoute("wishlist")}
              className="rounded-2xl border border-rose-100 bg-white p-3 hover:bg-rose-50"
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              onClick={() => setRoute("cart")}
              className="relative rounded-2xl border border-rose-100 bg-white p-3 hover:bg-rose-50"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart.length ? (
                <span className="absolute -right-1 -top-1 rounded-full bg-rose-400 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {cart.length}
                </span>
              ) : null}
            </button>

            <button
              onClick={() => setRoute("account")}
              className="rounded-2xl border border-rose-100 bg-white p-3 hover:bg-rose-50"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-2xl border border-rose-100 bg-white p-3 md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-rose-100 bg-white px-4 py-4 md:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setRoute(item.key);
                    setMenuOpen(false);
                  }}
                  className="rounded-2xl bg-rose-50 px-4 py-3 text-left text-slate-700"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {body}

      <footer className="mt-10 border-t border-rose-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
          <div>
            <h3 className="text-2xl font-black text-slate-800">Nella Store</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Loja virtual de moda infantil para menino e menina, do bebê ao juvenil.
            </p>
            <div className="mt-4 flex gap-3 text-slate-500">
              <Instagram className="h-5 w-5" />
              <Facebook className="h-5 w-5" />
              <Phone className="h-5 w-5" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800">Institucional</h4>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <button className="text-left">Sobre</button>
              <button className="text-left">Contato</button>
              <button className="text-left">FAQ</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800">Políticas</h4>
            <div className="mt-4 grid gap-3 text-sm text-slate-600">
              <button className="text-left">Privacidade</button>
              <button className="text-left">Termos</button>
              <button className="text-left">Trocas</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800">Newsletter</h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Receba novidades e promoções da Nella Store.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="flex-1 rounded-2xl border border-rose-200 px-4 py-3 outline-none"
              />
              <button
                onClick={saveNewsletter}
                className="rounded-2xl bg-rose-400 px-4 py-3 font-medium text-white"
              >
                <Mail className="h-4 w-4" />
              </button>
            </div>
            {newsletterCount ? (
              <p className="mt-3 text-xs text-emerald-600">
                Inscritos na demo: {newsletterCount}
              </p>
            ) : null}
          </div>
        </div>

        <div className="border-t border-rose-100 px-4 py-5 text-center text-sm text-slate-500">
          © 2026 Nella Store • Moda infantil delicada, elegante e divertida.
        </div>
      </footer>
    </div>
  );
}