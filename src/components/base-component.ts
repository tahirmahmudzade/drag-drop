export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	public templateElement: any;
	public hostElement: T;
	public element: U;

	constructor(
		templateElementId: string,
		hostElementId: string,
		inserAtStart: boolean,
		newElementId?: string
	) {
		this.templateElement = document.getElementById(
			templateElementId
		) as HTMLTemplateElement;
		this.hostElement = document.getElementById(hostElementId)! as T;

		const importedNode = document.importNode(
			this.templateElement.content,
			true
		);

		this.element = importedNode.firstElementChild as U;
		if (newElementId) {
			this.element.id = newElementId;
		}
		this.attach(inserAtStart);
	}

	private attach(insertAtBeginning: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtBeginning === true ? "afterbegin" : "beforeend",
			this.element
		);
	}

	abstract configure(): void;
	abstract renderContent(): void;
}
