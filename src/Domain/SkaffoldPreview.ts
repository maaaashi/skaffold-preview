export class SkaffoldPreview {
	constructor(
		private targetPath: string,
		private profile: string[],
		private command: string,
		private _result: string,
	) {}

	get result(): string {
		return this._result
	}
}
