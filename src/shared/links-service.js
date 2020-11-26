import firebase from '../firebase/firebase';

export default class LinksService {
  linksPath = 'links';
  db = firebase.firestore();
  linksCollection = this.db.collection(this.linksPath);

  getAllLinks = async () => {
    const data = await this.linksCollection.get();
    const links = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log('links', links);
    return links;
  };

  updateLink = (id, payload) => {
    return this.linksCollection.doc(id).update(payload);
  };

  addNewLink = (link) => {
    return this.linksCollection.add(link);
  };

  deleteLink = (id) => {
    return this.linksCollection.doc(id).delete();
  };
}
