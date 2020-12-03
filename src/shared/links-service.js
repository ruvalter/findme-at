import { firestore } from '../firebase/firebase';

export default class LinksService {
  linksPath = 'links';
  linksCollection = firestore.collection(this.linksPath);

  getAllLinks = async () => {
    const data = await this.linksCollection.get();
    const linksEntity = {};
    data.docs.forEach((doc) => {
      linksEntity[doc.id] = { id: doc.id, ...doc.data() };
    });
    return linksEntity;
  };

  updateLink = async (id, payload) => {
    return await this.linksCollection.doc(id).update(payload);
  };

  updateOrder = (links) => {
    links.forEach((link, index) => this.updateLink(link.id, { order: index }));
  };

  addNewLink = (link, links) => {
    return this.linksCollection.add(link).then((doc) => {
      this.updateOrder(links);
      return doc;
    });
  };

  deleteLink = (id) => {
    return this.linksCollection.doc(id).delete();
  };
}
