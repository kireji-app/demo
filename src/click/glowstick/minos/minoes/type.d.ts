declare interface IMinosGameMinoes
 extends IMix<IMinosGame, IMinosGameMino>,
 IWebView {

 // Subparts.
 readonly mino: IMinosGameMino
 readonly mino0: IMinosGameMino
 readonly mino1: IMinosGameMino
 readonly mino2: IMinosGameMino
}

declare const MinosMinoes: IMinosGameMinoes
type MinosMinoes = T