import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../api/api';
import { KEYS } from '../../constants';
import { seedReviews } from '../../lib/copper-data';
import { applicationId, orderId } from '../../utils';

const read = (key, fallback) => {
  const raw = storage.getString(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const persist = (key, value) => storage.set(key, JSON.stringify(value));

/** The web seeds one delivered order so the Orders screen is never empty. */
const seedOrder = {
  id: 'CR-M-1042',
  createdAt: 'August 12, 2026',
  status: 'Delivered',
  lines: [{ key: 'the-classic-logo-tee', productId: 'the-classic-logo-tee', qty: 1 }],
  total: 28,
  address: 'Jordan Hale, Sioux Falls, SD 57104',
  method: 'Standard',
};

const seedMessages = [
  {
    id: 'm1',
    from: 'cattery',
    text: "Welcome to Copper Road. We're glad you're here. Ask us anything about our kittens, the breeding plan, or go-home day.",
    time: 'Yesterday',
  },
];

const seedApplication = {
  id: 'CR-2026-1842',
  createdAt: 'September 2, 2026',
  status: 'Under Review',
  data: {
    firstName: 'Jordan',
    lastName: 'Hale',
    kitten: 'Any',
    timeline: '1–3 months',
    why: 'We want a gentle giant who will grow up with our family.',
  },
  timeline: [
    { label: 'Submitted', detail: 'We received your application.', done: true },
    { label: 'Under Review', detail: 'Tami is reading through your home details.', done: true },
    { label: 'Approved', detail: "We'll write when a kitten matches.", done: false },
    { label: 'Waitlisted', detail: 'A deposit holds your place when you are ready.', done: false },
  ],
};

/** RN equivalent of Project/src/lib/store.tsx. */
const initialState = {
  user: read(KEYS.SESSION_USER, null),
  onboarded: storage.getString(KEYS.IS_ONBOARD) === 'true',
  language: storage.getString(KEYS.LANGUAGE) ?? 'English',

  cart: read(KEYS.CART, []),
  wishlist: read(KEYS.WISHLIST, []),
  favCats: read(KEYS.FAV_CATS, ['olive']),
  favKittens: read(KEYS.FAV_KITTENS, ['seraphina']),
  orders: read(KEYS.ORDERS, [seedOrder]),
  applications: read(KEYS.APPLICATIONS, [seedApplication]),
  reviews: read(KEYS.REVIEWS, seedReviews),
  messages: read(KEYS.MESSAGES, seedMessages),
  notif: read(KEYS.NOTIF, { litters: true, kittens: true, orders: true }),
  waitlist: read(KEYS.WAITLIST, []),
  /** A saved but unsubmitted adoption application. */
  draft: read(KEYS.DRAFT, null),

  /** Set by placeOrder so the confirmation screen can find what was just bought. */
  lastOrderId: null,
  /** Set by submitApplication, likewise. */
  lastApplicationRef: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /* ------------------------------------------------------------- account */
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) persist(KEYS.SESSION_USER, action.payload);
      else storage.delete(KEYS.SESSION_USER);
    },

    updateUser: (state, action) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
      persist(KEYS.SESSION_USER, state.user);
    },

    markOnboarded: state => {
      state.onboarded = true;
      storage.set(KEYS.IS_ONBOARD, 'true');
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
      storage.set(KEYS.LANGUAGE, action.payload);
    },

    handleLogout: state => {
      state.user = null;
      storage.delete(KEYS.SESSION_USER);
    },

    /** The web clears applications and cart along with the account. */
    deleteAccount: state => {
      state.user = null;
      state.applications = [];
      state.cart = [];
      storage.delete(KEYS.SESSION_USER);
      persist(KEYS.APPLICATIONS, []);
      persist(KEYS.CART, []);
    },

    /* ---------------------------------------------------------------- cart */
    addToCart: (state, action) => {
      const { productId, qty = 1 } = action.payload;
      const found = state.cart.find(l => l.key === productId);
      if (found) found.qty += qty;
      else state.cart.push({ key: productId, productId, qty });
      persist(KEYS.CART, state.cart);
    },
    setQty: (state, action) => {
      const { key, qty } = action.payload;
      state.cart = qty <= 0 ? state.cart.filter(l => l.key !== key) : state.cart.map(l => (l.key === key ? { ...l, qty } : l));
      persist(KEYS.CART, state.cart);
    },
    removeLine: (state, action) => {
      state.cart = state.cart.filter(l => l.key !== action.payload);
      persist(KEYS.CART, state.cart);
    },
    clearCart: state => {
      state.cart = [];
      persist(KEYS.CART, []);
    },

    /* ------------------------------------------------------- saved for later */
    toggleWish: (state, action) => {
      const id = action.payload;
      state.wishlist = state.wishlist.includes(id) ? state.wishlist.filter(x => x !== id) : [...state.wishlist, id];
      persist(KEYS.WISHLIST, state.wishlist);
    },
    toggleFavCat: (state, action) => {
      const id = action.payload;
      state.favCats = state.favCats.includes(id) ? state.favCats.filter(x => x !== id) : [...state.favCats, id];
      persist(KEYS.FAV_CATS, state.favCats);
    },
    toggleFavKitten: (state, action) => {
      const id = action.payload;
      state.favKittens = state.favKittens.includes(id) ? state.favKittens.filter(x => x !== id) : [...state.favKittens, id];
      persist(KEYS.FAV_KITTENS, state.favKittens);
    },

    /* -------------------------------------------------------------- orders */
    placeOrder: (state, action) => {
      const id = action.payload.id ?? orderId();
      state.orders = [
        { ...action.payload, id, createdAt: 'September 30, 2026', status: 'Processing' },
        ...state.orders,
      ];
      state.lastOrderId = id;
      state.cart = [];
      persist(KEYS.ORDERS, state.orders);
      persist(KEYS.CART, []);
    },

    /* -------------------------------------------------------- applications */
    saveDraft: (state, action) => {
      state.draft = action.payload;
      persist(KEYS.DRAFT, action.payload);
    },
    submitApplication: (state, action) => {
      const id = action.payload.id ?? applicationId();
      state.applications = [
        {
          id,
          createdAt: 'September 30, 2026',
          status: 'Submitted',
          data: action.payload.data ?? action.payload,
          timeline: [
            { label: 'Submitted', detail: 'We have your application.', done: true },
            { label: 'Under Review', detail: "We'll be in touch soon.", done: false },
            { label: 'Approved', detail: 'A match, when the timing is right.', done: false },
            { label: 'Waitlisted', detail: 'A deposit holds your place.', done: false },
          ],
        },
        ...state.applications,
      ];
      state.lastApplicationRef = id;
      state.draft = null;
      persist(KEYS.APPLICATIONS, state.applications);
      storage.delete(KEYS.DRAFT);
    },

    /* ------------------------------------------------------------- reviews */
    addReview: (state, action) => {
      state.reviews = [{ ...action.payload, id: `rev-${Date.now()}` }, ...state.reviews];
      persist(KEYS.REVIEWS, state.reviews);
    },

    /* ------------------------------------------------------------ messages */
    sendMessage: (state, action) => {
      const { text, image } = action.payload;
      state.messages.push({ id: `c-${Date.now()}`, from: 'me', text, time: 'Now', image });
      persist(KEYS.MESSAGES, state.messages);
    },
    /** The cattery's canned reply, appended after the web's short delay. */
    receiveReply: (state, action) => {
      state.messages.push({
        id: `c-${Date.now()}r`,
        from: 'cattery',
        text:
          action.payload ??
          "Thank you for writing. We'll reply personally as soon as we can — usually within a day.",
        time: 'Now',
      });
      persist(KEYS.MESSAGES, state.messages);
    },

    /* ------------------------------------------------- notifications + waitlist */
    toggleNotif: (state, action) => {
      const key = action.payload;
      state.notif = { ...state.notif, [key]: !state.notif[key] };
      persist(KEYS.NOTIF, state.notif);
    },
    joinWaitlist: (state, action) => {
      const id = action.payload;
      if (!state.waitlist.includes(id)) state.waitlist.push(id);
      persist(KEYS.WAITLIST, state.waitlist);
    },
  },
});

export const {
  setUser,
  updateUser,
  markOnboarded,
  setLanguage,
  handleLogout,
  deleteAccount,
  addToCart,
  setQty,
  removeLine,
  clearCart,
  toggleWish,
  toggleFavCat,
  toggleFavKitten,
  placeOrder,
  saveDraft,
  submitApplication,
  addReview,
  sendMessage,
  receiveReply,
  toggleNotif,
  joinWaitlist,
} = appSlice.actions;

export default appSlice.reducer;

/* ---------------------------------------------------------------- selectors */
export const selectUser = s => s.app.user;
export const selectIsGuest = s => Boolean(s.app.user?.guest);
export const selectOnboarded = s => s.app.onboarded;
export const selectLanguage = s => s.app.language;
export const selectCart = s => s.app.cart;
export const selectCartCount = s => s.app.cart.reduce((n, l) => n + l.qty, 0);
export const selectWishlist = s => s.app.wishlist;
export const selectFavCats = s => s.app.favCats;
export const selectFavKittens = s => s.app.favKittens;
export const selectOrders = s => s.app.orders;
export const selectApplications = s => s.app.applications;
export const selectReviews = s => s.app.reviews;
export const selectMessages = s => s.app.messages;
export const selectNotif = s => s.app.notif;
export const selectWaitlist = s => s.app.waitlist;
export const selectDraft = s => s.app.draft;
export const selectLastOrderId = s => s.app.lastOrderId;
export const selectLastApplicationRef = s => s.app.lastApplicationRef;
/** The web hard-codes this badge at 2. */
export const selectUnread = () => 2;
