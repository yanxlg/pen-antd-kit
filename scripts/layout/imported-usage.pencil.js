function importedCards(root){return Get(root,n=>{
 if(n.children?.length!==2||n.children[0].context!=='section'||n.children[1].context!=='section')return;
 const meta=Get(n.children[1].id,{depth:1});if(meta.children?.length!==3)return;
 const title=Get(meta.children[0].id,n=>n.type==='text'?n.content:undefined).join('');
 if(!title)return;
 return {id:n.id,preview:n.children[0].id,meta:meta.id,title,description:Get(meta.children[1].id,n=>n.type==='text'?n.content:undefined).join(' ')};
});}
function normalizeImportedCards(slug,root,cardWidth){
 if(!(cardWidth>0))throw new Error('Use the card width verified against the official page layout');
 const cards=importedCards(root);
 for(const c of cards){
  const meta=Get(c.meta,{depth:1});
  Delete(meta.children[2].id);
  Update(c.id,{name:'Example · '+c.title,width:cardWidth,height:'fit_content',metadata:{sourceUrl:'https://ant.design/components/'+slug+'/',importSelector:'.demo-wrapper',importedCard:c.id}});
  Update(c.meta,{width:'fill_container',height:'fit_content'});
  Update(c.preview,{width:'fill_container'});
 }
 return cards;
}
function installImportedCards(slug,cards,columns,source){
 Update('artboard-'+slug+'-usage',{placeholder:true});
 for(const col of columns)for(const child of Get(col,{depth:1}).children||[])Delete(child.id);
 cards.forEach((card,index)=>Move(card.id,columns[index%columns.length]));
 Delete(source);
}
