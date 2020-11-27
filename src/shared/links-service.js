import firebase from '../firebase/firebase';

export default class LinksService {
  linksPath = 'links';
  db = firebase.firestore();
  linksCollection = this.db.collection(this.linksPath);

  getAllLinks = async () => {
    const data = await this.linksCollection.get();
    const links = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    links.sort((a, b) => a.order - b.order);
    console.log('links', links);
    return links;
  };

  updateLink = async (id, payload) => {
    return await this.linksCollection.doc(id).update(payload);
  };

  updateOrder = (links) => {
    links.forEach((link, index) => this.updateLink(link.id, { order: index }));
  };

  addNewLink = (link) => {
    return this.linksCollection.add(link);
  };

  deleteLink = (id) => {
    return this.linksCollection.doc(id).delete();
  };
}
